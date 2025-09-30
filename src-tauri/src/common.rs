use serde::{Deserialize, Serialize};

pub fn url(path: &str) -> String {
    format!("https://wzpmc.cn:83/api{}", path)
}

#[derive(Deserialize, Debug, Serialize)]
pub struct R<T> {
    pub(crate) msg: String,
    pub(crate) status: u32,
    pub(crate) timestamp: u128,
    #[serde(default)]
    pub(crate) data: T
}
