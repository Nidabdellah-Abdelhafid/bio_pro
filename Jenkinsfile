pipeline {
    agent any
    
    stages {
        stage('git Code') {
            steps {
                git url: 'https://github.com/Nidabdellah-Abdelhafid/bio_pro.git'
            }
        }
        
        stage('Login to docker') {
            steps {
                script {
                    bat 'docker login -u hafidnid -p haFI99D#33'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    def kubeconfig = 'C:\\Users\\HP\\.kube\\config'
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
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible localhost -m ping --extra-vars remote_tmp=/tmp/ansible-HP"'
                }
            }
        }

        stage('Deploying App to Kubernetes') {
            steps {
                script {
                    echo 'Running Ansible Playbook.......'
                    bat 'C:\\cygwin\\bin\\bash -c "/cygdrive/c/cygwin/bin/ansible-playbook -i localhost, -e kubeconfig=/cygdrive/c/Users/HP/.kube/config -e ANSIBLE_CONFIG=/cygdrive/c/cygwin/etc/ansible/ansible.cfg --extra-vars ansible_user=HP --extra-vars remote_tmp=/tmp/ansible-HP deploy_app.yml -vvv"'
                }
            }
        }
    }
}
