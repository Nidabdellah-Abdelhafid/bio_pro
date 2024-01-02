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

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    
                    kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "MY_KUBE_CONFIG")

                }
            }
        }
    }
}



