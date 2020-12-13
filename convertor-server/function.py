import os


def Video_to_audio(path, vid_ext, aud_ext):
    VIDEOS_PATH = path
    VIDEOS_EXTENSION = vid_ext  # ".mp4"
    AUDIO_EXT = aud_ext  # "wav"
    EXTRACT_VIDEO_COMMAND = ('ffmpeg -i "{from_video_path}" '
                             '-f {audio_ext} -ab 192000 '
                             '-vn "{to_audio_path}"')

    os.chdir(VIDEOS_PATH)
    files = os.listdir(VIDEOS_PATH)
    for f in files:
        if not f.endswith(VIDEOS_EXTENSION):
            continue

        audio_file_name = '{}.{}'.format(f, AUDIO_EXT)
        command = EXTRACT_VIDEO_COMMAND.format(
            from_video_path=f, audio_ext=AUDIO_EXT, to_audio_path=audio_file_name,
        )
        os.system(command)
