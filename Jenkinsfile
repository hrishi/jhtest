#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        cmd /k  "java -version"
    }

    stage('clean') {
        cmd /k  "./mvnw clean"
    }

    stage('install tools') {
        cmd /k  "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v6.9.4 -DyarnVersion=v0.19.1"
    }

    stage('yarn install') {
        cmd /k  "./mvnw com.github.eirslett:frontend-maven-plugin:yarn"
    }
    stage('backend tests') {
        try {
            cmd /k  "./mvnw test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }

    stage('frontend tests') {
        try {
            cmd /k  "./mvnw com.github.eirslett:frontend-maven-plugin:gulp -Dfrontend.gulp.arguments=test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/karma/TESTS-*.xml'
        }
    }

    stage('packaging') {
        cmd /k  "./mvnw package -Pprod -DskipTests"
        archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
    }

    // Uncomment the following block to add Sonar analysis.
    /*stage('quality analysis') {
        withSonarQubeEnv('Sonar Server') {
            cmd /k  "./mvnw sonar:sonar"
        }
    }*/

}
