#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        cmd /c  "java -version"
    }

    stage('clean') {
        cmd /c  "./mvnw clean"
    }

    stage('install tools') {
        cmd /c  "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v6.9.4 -DyarnVersion=v0.19.1"
    }

    stage('yarn install') {
        cmd /c  "./mvnw com.github.eirslett:frontend-maven-plugin:yarn"
    }
    stage('backend tests') {
        try {
            cmd /c  "./mvnw test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }

    stage('frontend tests') {
        try {
            cmd /c  "./mvnw com.github.eirslett:frontend-maven-plugin:gulp -Dfrontend.gulp.arguments=test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/karma/TESTS-*.xml'
        }
    }

    stage('packaging') {
        cmd /c  "./mvnw package -Pprod -DskipTests"
        archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
    }

    // Uncomment the following block to add Sonar analysis.
    /*stage('quality analysis') {
        withSonarQubeEnv('Sonar Server') {
            cmd /c  "./mvnw sonar:sonar"
        }
    }*/

}
