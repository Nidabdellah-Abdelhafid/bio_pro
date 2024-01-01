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
                    bat  'docker login -u hafidnid -p haFI99D#33'
                }
            }
        }
        
        stage('Build Project') {
            steps {
                script {
                  
                    // Build the project and create a Docker image
                    bat  './mvnw package -Pprod -DskipTests verify jib:dockerBuild'
                }
            }
        }
        
        stage('Push') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    bat  'docker push hafidnid/app_biomedicale_db_local_finale:latest'
                }
            }
        }

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    
                   kubernetesDeploy(configs: "deployementservice.yml", kubeconfigId: "MY_KUBE_CONFIG")
                }
            }
        }
    }
}

