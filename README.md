# ReactRouterApp

Vite + React 19 환경에서 **React Router** 라우팅을 학습하기 위한 실습 프로젝트입니다.  
`RouterBasic.jsx`에서 BrowserRouter, 중첩 라우트, URL 파라미터, 보호 라우트, `useRoutes` 등을 다룹니다.

## 주요 기능

- **페이지 라우팅**: Home, About, Product, Blog, Admin, Login
- **중첩 라우트**: `/blog` → 게시글 목록, `/blog/:postid` → 상세
- **동적 파라미터**: `useParams()`로 postid 기반 영화 감상문 표시
- **로그인 상태**: `useState`로 사용자·관리자 권한 관리
- **보호 라우트**: `ProtectRoute` — admin 권한 없으면 `/login`으로 리다이렉트
- **styled-components**: `Title`, `MyButton` 스타일 컴포넌트 예제
- **useRoutes**: 선언적 라우트 배열 방식 (`MyRoutes`)

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 19 |
| Build | Vite 7 |
| Routing | react-router-dom |
| Styling | styled-components |
| Lint | ESLint 9 |

## 프로젝트 구조

```
ReactRouterApp/
├── src/
│   ├── main.jsx          # RouterBasic 마운트
│   ├── RouterBasic.jsx   # 라우터 실습 메인 컴포넌트
│   └── App.jsx           # Vite 기본 템플릿 (미사용)
├── index.html
└── package.json
```

## 데모 계정

| 항목 | 값 |
|------|-----|
| 관리자 ID | `admin` |
| 비밀번호 | `123` |

관리자로 로그인하면 `/admin` 페이지 접근이 가능합니다.

## 라우트 구조

```
/                 → Home
/about            → About
/product          → Product
/blog             → Blog (게시글 목록)
/blog/:postid     → 게시글 상세
/admin            → Admin (로그인 + admin 권한 필요)
/login            → Login
*                 → NotFound
```
