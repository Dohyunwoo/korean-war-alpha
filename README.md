# korean-war-alpha

## 프로젝트 셋업 명령어
```
yarn install
```

### 프로젝트 개발 서버 오픈 명령어
```
yarn serve
```

### dist/index.html 아웃풋을 만들기 위한 명령
> 해당 명령어를 실행한 후 firebase deploy 명령어를 실행해야 변경된 사항 deploy
```
yarn build
```

### firebase의 deploy 명령
```
firebase deploy // 기본 명령어
firebase deploy --only=hosting // 옵션 추가 명령어 해당 명령어는 hosting 모듈만 디플로이 된다
```
