use md5::{Digest, Md5};
use serde::{Deserialize, Serialize};
use serde_json::to_string_pretty;
use tauri::http::Method;
use tauri_plugin_http::reqwest;
use crate::command_error::CommandError;
use crate::common::{url, R};

#[derive(Serialize)]
struct User {
    username: String,
    password: String,
    auth: String,
    invite_code: String,
}

#[derive(Deserialize, Debug, Serialize)]
#[derive(Default)]
pub struct UserInfo {
    id: u32,
    name: String,
    banned: bool,
    auth: String,
    #[serde(default)]
    token: String,
}


/// 登录函数
#[tauri::command]
pub async fn login(username: &str, password: &str) -> Result<UserInfo, CommandError> {
    let md5_hash = Md5::digest(password.as_bytes());
    // 将哈希值转换为 32 位十六进制字符串（小写）
    let result = format!("{:x}", md5_hash);
    // 登录请求发送
    let data = User {
        username: username.parse().unwrap(),
        password: result.as_str().parse().unwrap(),
        auth: "user".to_string(),
        invite_code: "".to_string(),
    };
    let client = reqwest::Client::new();
    let res = reqwest::Client::request(&client, Method::POST, url("/user/login"))
        .header("Content-Type", "application/json")
        .body(to_string_pretty(&data).unwrap())
        .send()
        .await
        .map_err(|e| {
            CommandError::new(format!("网络请求失败：{}", e))
        })?;
    let headers = res.headers().clone();
    let text = res.text().await.unwrap();
    let login_status = headers.get("add-authorization").ok_or(CommandError::new("账号或者密码错误".to_string()));
    let user: R<UserInfo> = match serde_json::from_str(&*text) {
        Ok(u) => u,
        Err(e) => {
            eprintln!("JSON 解析失败：{}", e);
            return Err(CommandError::new("服务器返回数据格式错误".to_string()));
        }
    };

    if user.status != 200 {
        return Err(CommandError::new(user.msg))
    }

    let data = user.data;
    match login_status {
        Err(e) => Err(e),
        Ok(token) => Ok(UserInfo {
            id: data.id,
            name: data.name,
            banned: data.banned,
            auth: data.auth,
            token: token.to_str().unwrap().to_string()
        })
    }
}
