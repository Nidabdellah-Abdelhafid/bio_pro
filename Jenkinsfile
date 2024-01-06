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
        
        stage('Prepare Environment') {
            steps {
                script {
                    // Add the chmod command to give necessary permissions
                    sh 'chmod u+rwx /tmp/ansible'
                    echo 'passed per...'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                // Add your existing deployment steps here
                script {
                    bat 'start /B C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=/cygdrive/c/cygwin/etc/ansible/ansible.cfg --user=HP deploy_app.yml"'
                }
            }
        }
        
    }
}

