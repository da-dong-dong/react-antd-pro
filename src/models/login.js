import axios from "axios";
import router from "umi/router";

const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {
    token: "",
    role: "",
    username: "",
    balance: 0
};

// api
function login(payload) {
    return axios.post("/api/login", payload);
}

export default {
    namespace: "user", // 可省略
    state: userinfo, // 初始状态：缓存或空对象
    effects: {
        // action: user/login
        *login({ payload }, { call, put }) {
            try {
                const { data: { code, data: userinfo } } = yield call(login, payload)
                // 登录成功: 缓存用户信息
                console.log(code, userinfo, '555')
                localStorage.setItem("userinfo", JSON.stringify(userinfo));
                yield put({ type: "init", payload: userinfo });
                router.push("/");
            } catch (error) { }
        }
    },
    reducers: {
        init(state, action) {
            // 覆盖旧状态
            return action.payload;
        }
    }
}