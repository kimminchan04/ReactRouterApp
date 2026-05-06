import {BrowserRouter, Routes, Route, NavLink, Outlet, useParams, Link, useNavigate, Navigate, useRoutes} from 'react-router-dom';
import {useState} from 'react'
import styled from 'styled-components'
const Title = styled.h1`
    color: orange;
    padding: 16px;
    text-decoration: underline; 
`
const MyButton = styled.button`
    background: transparent;
    border-radius: 3px;
    
`;
const Main = ({user}) => {
    return (
        <>
        <nav>
            <p>
                <NavLink to='/'>Home</NavLink>
            </p>
            <p>
                <NavLink to='/about'>About</NavLink>
            </p>
            <p>
                <NavLink to='/product'>Product</NavLink>
            </p>
            <p>
                <NavLink to='/blog'>Blog</NavLink>
            </p>
            <p>{user.username == '' ?
                <NavLink to='/login'>Login</NavLink>
                : (
                    <div>
                        <span>{user.username}님 환영합니다</span>
                        <NavLink to='/logout'>Logout</NavLink>
                    </div>
                )}
            </p>
            <p>
                <NavLink to='/admin'>Admin</NavLink>
            </p>
        </nav>
        <Outlet />
        </>
    )
}

const Home = () => {
    return (
        <div>
            <Title>HOME page</Title>
            <p>This is HOME component page</p>
            <button>Plain Button</button>
            <MyButton>Styled BUtton</MyButton>
        </div>
    )
}
const About = () => {
    return (
        <div>
            <h1 style={{color: 'red'}}>ABOUT page</h1>
            <p>This is ABOUT component page</p>
        </div>
    )
}
const Product = () => {
    return (
        <div>
            <h1>PRODUCT page</h1>
            <p>This is PRODUCT component page</p>
        </div>
    )
}
const PostData = {
    post1: {
        title: 'My best movie review post 1',
        content: '영화 감상문 내용....'
    },
    post2: {
        title: 'My best movie review post 2',
        content: '액션 영화 감상문 내용....'
    },
    post3: {
        title: 'My best movie review post 3',
        content: '스릴러 영화 감상문 내용....'
    },
    post4: {
        title: 'My best movie review post 4',
        content: '드라마 영화 감상문 내용....'
    },
};
const PostList = () => {
    return (
        <ul>
            {
                Object.entries(PostData).map(([postid, { title }])=>(
                    <li key={postid}>
                        <Link to={`/blog/${postid}`}>{title}</Link>
                    </li>
                ))
            }
        </ul>
    )
}
const Post = () => {
    const {postid} = useParams(); 
    const post = PostData[postid];
    const { title, content } = post;
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
}
const Blog = () => {
    return (
        <div>
            <Title>BLOG page</Title>
            <p>This is BLOG component page</p>
            <Outlet />
        </div>
    )
}
const ProtectRoute = ({user, children}) => {
    if (!user.admin) {
        return <Navigate to='/login' replace/>
    }
    return children
}
const AdminPage = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>This is Admin component page</p>
            <Outlet/>
        </div>
    )
}
const NotFound = () => {
    return (
        <div>
            <h1>Not Found Error</h1>
            <p>Page is not found</p>
        </div>
    )
}
const Login = ({setUser}) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '', password: ''
    });
    const handleInput = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }
    const handleLogin = () => {
        if (input.username == 'admin' && input.password == '123') {
            setUser({...input, admin: true});
        } else {
            setUser({...input, admin: false});
        }
        alert("로그인 완료했습니다");
        navigate('/');
    }
    return (
        <div>
            <h2>User Login</h2>
            <input type='text' name='username' placeholder='Username' onChange={handleInput}/><br/>
            <input type='password' name='password' placeholder='Password' onChange={handleInput}/><br/>
            <button onClick={handleLogin}>Login</button>
            <p>User: {input.username}</p>
            <p>Password: {input.password}</p>
        </div>
    )
}
const Logout = ({setUser}) => {
    const navigate = useNavigate();
    setUser({username: '', password: '', admin: false});
    /* return <Navigate to='/' replace/> */
    /* navigate('/'); */
    return <button onClick={() => navigate('/')}>To Home</button>
}
const AppRouter = () => {
    const [user, setUser] = useState({
        username: '', password: '', admin: false
    });
    return (
        <div>
            <Routes>
                <Route path='/' element={<Main user={user}/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/blog' element={<Blog />}>
                        <Route index element={<PostList />}/>
                        <Route path=':postid' element={<Post />}/>
                    </Route>
                    <Route path='/login' element={<Login setUser={setUser}/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route path='/logout' element={<Logout setUser={setUser}/>}/>
                    <Route path='/admin' element={<ProtectRoute user={user}><AdminPage/></ProtectRoute>}/>
                </Route>
            </Routes>
        </div>
    )
}
const MyRoutes = () => {
    const routes = useRoutes([
        {path: '/', element: <Home/>},
        {path: '/about', element: <About/>},
        {path: '/blog', element: <Blog/>,
            children: [{index: true, element: <PostList/>}, {path: ':postid', element: <Post/>}]
        },
        {path: "*", element: <NotFound/>}
    ])
    return routes
}
export default function RouterBasic() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}