#!/bin/bash

# Dahua CMS GitHub 푸시 스크립트

echo "🚀 Dahua CMS - GitHub 푸시 시작"
echo ""
echo "📍 저장소: https://github.com/jjchoihogak-web/dahua-cms.git"
echo ""

cd /home/project/jirisan

# Git 상태 확인
echo "=== Git 상태 확인 ==="
git status
echo ""

# 브랜치 확인
echo "=== 브랜치 확인 ==="
git branch
echo ""

# 커밋 확인
echo "=== 커밋 내역 ==="
git log --oneline --all
echo ""

# Remote 확인
echo "=== Remote 설정 확인 ==="
git remote -v
echo ""

echo "✅ 준비 완료!"
echo ""
echo "⚠️  GitHub에서 저장소를 생성했다면:"
echo "   git push -u origin main"
echo ""
echo "💡 아직 생성하지 않았다면:"
echo "   https://github.com/new 에서 저장소 생성 후 푸시하세요"
echo ""

