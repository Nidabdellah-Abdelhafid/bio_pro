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

        stage('Debug User') {
            steps {
                script {
                    bat 'whoami'
                }
            }
        }

        stage('Test Ansible Connection') {
            steps {
                script {
                    // Use Ansible ad-hoc command for testing connection to localhost without sudo
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible localhost -m ping --extra-vars remote_tmp=/tmp/ansible-HP"'
                }
            }
        }


        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    echo 'Running Ansible Playbook.......'
                    
                    // Install the kubernetes module
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/python3.7 -m pip install kubernetes"'

                    // Run the Ansible playbook
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=/cygdrive/c/cygwin/etc/ansible/ansible.cfg --extra-vars ansible_user=HP --extra-vars remote_tmp=/tmp/ansible-HP deploy_app.yml -vvv"'
                }
            }
        }
        
    }
}

