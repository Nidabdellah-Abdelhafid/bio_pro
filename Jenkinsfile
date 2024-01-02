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

