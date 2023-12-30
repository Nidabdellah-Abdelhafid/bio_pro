#!/usr/bin/env groovy

node {
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    
    agent any
    
    stage('checkout') {
        checkout scm
    }

    gitlabCommitStatus('build') {
        docker.image('jhipster/jhipster:v7.9.3').inside('-u jhipster -e MAVEN_OPTS="-Duser.home=./"') {
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
    }
}
