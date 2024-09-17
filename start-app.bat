cd ./uxstudio-devchallenge.backend
start cmd /c "call ./gradlew bootRun"
timeout /t 20
cd ../uxstudio-devchallenge.frontend
call npm install
start cmd /c "call npm run dev"
start http://localhost:5173/