<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="https://cdn-longterm.mee6.xyz/plugins/commands/images/841690380290097253/77539f830b4eb4a3a15aa6d9f4f9aec9d726ba907e433877032ab213784ad360.png">
    <link rel="stylesheet" href="/css/Dangky.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <title>Đăng ký - MineBruh</title>
</head>
<body>
    <div id="wrapper">
        <form action="" id="form-register" method="post">
            <h1 class="form-heading"><a href="/html/Trangchu.html" class="form-heading-link">MineBruh </a>Đăng Ký</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" name="username" class="form-input" placeholder="Tên đăng nhập" required autofocus>
            </div>
            <div class="form-group">
                <i class="far fa-envelope"></i>
                <input type="email" name="useremail" class="form-input" placeholder="Email" required autofocus>
            </div>
            <div class="form-group">
                <i class="far fa-key"></i>
                <input type="password" name="userpassword" class="form-input" id="password" placeholder="Mật khẩu" required autofocus>
                <div class="eye">
                    <i class="far fa-eye"></i>
                </div>
            </div>
            <div class="form-group">
                <i class="far fa-key"></i>
                <input type="password" name="reuserpassword" class="form-input" id="repassword" placeholder="Nhập lại mật khẩu" required autofocus>
                <div class="eye">
                    <i class="far fa-eye"></i>
                </div>
            </div>
            <input type="submit" name="btn-reg" value="Đăng Ký" class="form-submit" onclick="return validate();">
            <h4 class="text-fooding">Bạn đã có tài khoản? <a href="/html/Dangnhap.html" class="text-fooding-link">Hãy đăng nhập tại đây</a></h4>
        </form>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="/js/Dangky.js"></script>
<script src="/js/main.js"></script>
</html>