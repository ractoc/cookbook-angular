pipeline {
  agent any

  stages {
    stage ('Build Application') {
      steps {
        sh 'npm install'
        sh 'ng build'
      }
    }

    stage("Deploy Application"){
      steps{
        echo 'cleanup previous install'
        sh 'rm -R /var/www/html/* 1>/dev/null 2>&1'
        echo 'new install'
        sh "cp dist/* /var/www/html"
      }
    }

    stage('Clean workspace') {
      steps {
        cleanWs()
      }
    }
  }
}
