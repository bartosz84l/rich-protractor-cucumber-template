Xvfb :0 -ac -screen 0 1920x1080x24 &
export DISPLAY=:0.0
mkdir $(pwd)/.tmp
tmux new-session -d -s TestRecording 'ffmpeg -y -r 30 -f x11grab -video_size 1920x1080 -i :0.0 $(pwd)/.tmp/output-test.mp4'
npm run contact
tmux send-keys -t TestRecording q
sleep 10