pipeline {
    agent any
    
    stages {
        stage('checkout source') {
            steps {
                git 'https://github.com/Nidabdellah-Abdelhafid/bio_pro.git'
            }
        }

        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('build') {
            steps {
                script {
                    // Assuming you have a plugin providing gitlabCommitStatus step
                    def setCommitStatus = { status ->
                        gitlabCommitStatus(
                            name: 'Build Status',
                            color: status ? 'success' : 'failed',
                            ref: GIT_COMMIT,
                            token: 'glpat-1MYRzyuv62b-_28iWNj-'
                        )
                    }

                    // Set initial commit status
                    setCommitStatus(true)

                    docker.image('jhipster/jhipster:v7.9.3').inside('-u jhipster -e MAVEN_OPTS="-Duser.home=./"') {
                        // Your existing stages go here
                        stage('check java') {
                            sh "java -version"
                        }
                        stage('nohttp') {
                            sh "./mvnw -ntp checkstyle:check"
                        }
                        stage('install tools') {
                            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm@install-node-and-npm"
                        }
                        stage('npm install') {
                            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
                        }
                        stage('packaging') {
                            sh "./mvnw -ntp verify -P-webapp -Pprod -DskipTests"
                            archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
                        }
                    }

                    // Set final commit status
                    setCommitStatus(currentBuild.resultIsBetterOrEqualTo('SUCCESS'))
                }
            }
        }
    }
}



