# SECURITY-10-08

Mục tiêu: lưu mã + artefacts quét bảo mật (Semgrep, ZAP, testssl, v.v.)
## Cấu trúc
src/                 # mã & artefact nguồn
_rules/              # rule Semgrep tuỳ biến
_reports/            # báo cáo sinh ra (JSON/CSV/HTML/SARIF)
scripts/             # shell script chạy scan
