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
                    echo 'Running Ansible Playbook...'
                    echo "Kubeconfig Path: C:/Users/HP/.kube/config"
                    echo "Working Directory: ${WORKSPACE}"
                    echo "Cygwin Path: C:\\cygwin\\bin\\bash"
                    //bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=C:/Users/HP/.kube/config deploy_app.yml"'
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=ansible.cfg deploy_app.yml"'

                }

            }
        }
        
    }
}

