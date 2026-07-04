// Hides the allocated console window on Windows when built in release mode.
// Without this, starting the app would flash a cmd.exe window in the background.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    obsy_launcher_lib::run()
}
