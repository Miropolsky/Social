import { useEffect, useState } from 'react';
import useSound from 'use-sound'; //для работы со звуком
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'; // иконки для следующего и предыдущего трека
import { IconContext } from 'react-icons'; // для кастомизации иконок
import styles from './Player.module.scss';
import { track } from './Music';

type PropsType = {
    track: track;
    nextPlay: () => void;
    prevPlay: () => void;
};

const Player = (props: PropsType) => {
    const [seconds, setSeconds] = useState(0);
    const [currTime, setCurrTime] = useState({
        min: '0',
        sec: '0',
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound, stop }] = useSound(
        props.track.preview
    );
    useEffect(() => {
        stop();
        setIsPlaying(false);
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([])); // устанавливаем состояние с текущим значением в секундах
                let min: string | number = Math.floor(sound.seek([]) / 60);
                let sec: string | number = Math.floor(sound.seek([]) % 60);
                if (min < 10) {
                    min = `0${min}`;
                }
                if (sec < 10) {
                    sec = `0${sec}`;
                }
                setCurrTime({
                    min: `${min}`,
                    sec: `${sec}`,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound, props.track, stop]);
    const playingButton = () => {
        if (isPlaying) {
            pause(); // приостанавливаем воспроизведение звука
            setIsPlaying(false);
        } else {
            play(); // воспроизводим аудиозапись
            setIsPlaying(true);
        }
    };

    return (
        <div className={styles.component}>
            <div className={styles.componentInfo}>
                <div className={styles.btns}>
                    <button className={styles.playButton}>
                        <IconContext.Provider
                            value={{ size: '3em', color: '#277cae' }}
                        >
                            <BiSkipPrevious
                                style={{ cursor: 'pointer', border: 'none' }}
                                onClick={async () => {
                                    stop();
                                    setIsPlaying(false);
                                    props.prevPlay();
                                }}
                            />
                        </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                        <button
                            style={{ cursor: 'pointer', border: 'none' }}
                            className={styles.playButton}
                            onClick={playingButton}
                        >
                            <IconContext.Provider
                                value={{ size: '3em', color: '#277cae' }}
                            >
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <button
                            style={{ cursor: 'pointer', border: 'none' }}
                            className={styles.playButton}
                            onClick={playingButton}
                        >
                            <IconContext.Provider
                                value={{ size: '3em', color: '#277cae' }}
                            >
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}
                    <button className={styles.playButton}>
                        <IconContext.Provider
                            value={{ size: '3em', color: '#277cae' }}
                        >
                            <BiSkipNext
                                style={{ cursor: 'pointer', border: 'none' }}
                                onClick={() => {
                                    stop();
                                    setIsPlaying(false);
                                    props.nextPlay();
                                }}
                            />
                        </IconContext.Provider>
                    </button>
                </div>
                <img
                    className={styles.musicCover}
                    width={50}
                    height={50}
                    src={props.track.artist.picture_medium}
                    alt='img'
                />
                <div className={styles.name}>
                    <h3 className={styles.title}>{props.track.title}</h3>
                    <p className={styles.subTitle}>{props.track.artist.name}</p>
                </div>
            </div>
            <div className={styles.progress}>
                <div className={styles.time}>
                    {currTime.min}:{currTime.sec}
                </div>
                <input
                    style={{ width: '100%' }}
                    type='range'
                    min='0'
                    max={(duration as number) / 1000}
                    // defaultValue={0}
                    value={seconds}
                    className='timeline'
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
        </div>
    );
};

export { Player };
