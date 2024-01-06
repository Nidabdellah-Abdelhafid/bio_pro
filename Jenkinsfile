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
                    echo 'Prepare Environment'
                    // Take ownership of the directory
                    bat 'takeown /F C:\\cygwin\\tmp\\ansible /R /A'

                    // Wait for a short duration (e.g., 5 seconds) to allow ownership changes to take effect
                    bat 'timeout /T 5 /NOBREAK'

                    // Automatically answer "O" (Yes) to replace permissions prompt
                    bat 'echo O | icacls C:\\cygwin\\tmp\\ansible /grant:r "USER:(OI)(CI)F"'
                    
                    echo 'Prepare Environment passed ...'
                    echo "Kubeconfig Path: C:/Users/HP/.kube/config"
                    echo "Working Directory: ${WORKSPACE}"
                    echo "Cygwin Path: C:\\cygwin\\bin\\bash"
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=/cygdrive/c/cygwin/etc/ansible/ansible.cfg --user=HP deploy_app.yml"'

                }

            }
        }
        
    }
}

