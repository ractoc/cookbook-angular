pipeline {
  agent any

  stages {
    stage ('Build Application') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage("Deploy Application"){
      steps{
        echo 'make sure there is always something to clean'
        sh 'touch /var/www/html/test.txt'
        echo 'cleanup previous install'
        sh "rm -R /var/www/html/* 1>/dev/null 2>&1"
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
