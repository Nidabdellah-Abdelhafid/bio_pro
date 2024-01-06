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

        stage('Test Ansible Connection') {
            steps {
                script {
                    // Use Ansible ad-hoc command for testing connection to localhost
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible localhost -m ping"'
                }
            }
        }

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    echo 'Running Ansible Playbook.......'
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=/cygdrive/c/cygwin/etc/ansible/ansible.cfg --extra-vars ansible_user=DESKTOP-7JBHK4H --extra-vars remote_tmp=/tmp/ansible-DESKTOP-7JBHK4H --become deploy_app.yml"'
        
                }

            }
        }
        
    }
}

