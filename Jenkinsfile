pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the code from the GitHub repository
                git url: 'https://github.com/Nidabdellah-Abdelhafid/bio_pro.git'
            }
        }
        
        stage('Login') {
            steps {
                script {
                    // Login to Docker Hub with credentials
                    bat 'docker login -u hafidnid -p haFI99D#33'
                }
            }
        }

        stage('Cleanup') {
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
                                                        
                    bat 'ANSIBLE_DEBUG=true C:\\cygwin64\\bin\\bash -c "/cygdrive/c/cygwin64/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config deploy_app.yml --connection=local"'
                }
            }
        }
        
    }
}

