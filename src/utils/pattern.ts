const patternUnit = {
    emailReg :/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,  // 邮箱验证
    psdReg :/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{6,12}$/,  // 密码验证
    phoneReg :/^1[0-9]{10}$/,  // 手机验证
}

export default patternUnit