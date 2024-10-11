# Cài đặt trên Client

```js
//sso.js
export const sso = new SSO("serviceId");
```
- Tạo một instance của SSO với `serviceId` là id của service mà bạn đã đăng ký trên hệ thống SSO.
### Tạo hàm chuyển hướng khi click vào Login button
```jsx
// Login.jsx
const handleLogin = () => {
  // tham số truyền vào là đường dẫn được chuyển hướng về sau khi đăng nhập xong
  sso.redirectToLogin(location.origin + callBackUrl);
};
```
```jsx
<button onClick={handleLogin} className={'py-3 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-500'}>
  Đăng nhập bằng tài khoản OggyClub
</button>
```

# Xử lý callback sau khi đăng nhập
```jsx
 //Định nghĩa router cho trang callback
export const router = createBrowserRouter([
  {
    path: callBackUrl,
    element: <CallBackHandler/>,
  },
]);

```

```jsx
//CallBackHandler.jsx
const [searchParams] = useSearchParams();
const token = searchParams.get('Token');
if (token) {
  setCookie('Token', token); // hàm tự định nghĩa để lưu token vào cookie
}
```

Tiếp tục config server side [tại đây](/sso/server)
