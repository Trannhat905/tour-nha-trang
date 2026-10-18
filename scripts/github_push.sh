#!/usr/bin/env bash
# Push dự án "Tour du lịch Nha Trang — Nhóm 4" lên GitHub.
# Cách dùng: bash scripts/github_push.sh <GITHUB_TOKEN> [tên-repo] [public|private]
set -euo pipefail

TOKEN="${1:?Thiếu token — tạo tại https://github.com/settings/tokens (classic, tick quyền repo)}"
NAME="${2:-tour-nha-trang}"
VIS="${3:-public}"

API="https://api.github.com"
H_AUTH="Authorization: Bearer ${TOKEN}"
H_ACC="Accept: application/vnd.github+json"

echo "-> Kiem tra token..."
LOGIN=$(curl -sf -H "$H_AUTH" -H "$H_ACC" "$API/user" | python3 -c 'import sys,json;print(json.load(sys.stdin)["login"])')
echo "   OK - tai khoan: $LOGIN"

echo "-> Tao repo $NAME ($VIS)..."
PRIV="false"; [ "$VIS" = "private" ] && PRIV="true"
CODE=$(curl -s -o /tmp/gh_repo.json -w "%{http_code}" -X POST -H "$H_AUTH" -H "$H_ACC" "$API/user/repos" \
  -d "{\"name\":\"$NAME\",\"private\":$PRIV,\"description\":\"Bai thuyet trinh Nhom 4 - Thiet ke tour du lich Nha Trang 3 ngay 2 dem\",\"has_wiki\":false}")
if [ "$CODE" = "201" ]; then
  echo "   Da tao repo $LOGIN/$NAME"
elif [ "$CODE" = "422" ]; then
  echo "   Repo da ton tai - se push vao repo co san"
else
  echo "   Loi tao repo (HTTP $CODE):"; cat /tmp/gh_repo.json; exit 1
fi

echo "-> Them remote & push nhanh main..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${TOKEN}@github.com/${LOGIN}/${NAME}.git"
git branch -M main
git push -u origin main 2>&1 | sed "s/${TOKEN}/***TOKEN***/g"

# Xoa token khoi .git/config sau khi push xong (an toan)
git remote set-url origin "https://github.com/${LOGIN}/${NAME}.git"

echo ""
echo "=> XONG! Repo: https://github.com/${LOGIN}/${NAME}"
echo "   Token da duoc xoa khoi .git/config - ban co the revoke token tren GitHub khi khong con can."
