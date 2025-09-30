use serde::Serialize;

#[derive(Serialize)]
#[warn(non_snake_case)]
pub struct CommandError {
    message: String,
}

impl CommandError {
    pub fn new(message: String) -> Self {
        Self { message }
    }
}
