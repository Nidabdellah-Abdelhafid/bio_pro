pipeline {
    agent any
    
    stages {
        stage('get the code from the GitHub repository') {
            steps {
                // Checkout the code from the GitHub repository
                git url: 'https://github.com/Nidabdellah-Abdelhafid/bio_pro.git'
            }
        }
        
        stage('Login to Dockerhub') {
            steps {
                script {
                    // Login to Docker Hub with credentials
                    bat 'docker login -u hafidnid -p haFI99D#33'
                }
            }
        }

        stage('Run Ansible Connection') {
            steps {
                script {
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible localhost -m ping --extra-vars remote_tmp=/tmp/ansible-HP"'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                  
                    // Test of project
                    bat  './mvnw test -DskipITs'
                }
            }
        }

        stage('Build image Docker') {
            steps {
                script {
                  
                    // Build the project and create a Docker image
                    bat  './mvnw package -Pprod -DskipTests verify jib:dockerBuild'
                }
            }
        }
        
        stage('Push to Dockerhub') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    bat  'docker push hafidnid/app_biomedicale_db_deploy2_finale:latest'
                }
            }
        }

        
        stage('Cleanup Kubernetes') {
            steps {
                script {
                    def kubeconfig = 'C:\\Users\\HP\\.kube\\config'

                    // Delete existing deployments, services, and pods
                    bat script: "kubectl delete deployments,services,pods --all --kubeconfig=${kubeconfig}"
                }
            }
        }
        
        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    // Set the kubeconfig file path (adjust accordingly)
                    def kubeconfig = 'C:\\Users\\HP\\.kube\\config'  // Update with your Minikube IP address

                    bat script: "kubectl apply --kubeconfig=${kubeconfig} -f deploymentservice.yml --validate=false --timeout=30m"
                }
            }
        }
    }
}