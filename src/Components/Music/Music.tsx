import { useEffect, useState } from 'react';
import styles from './Music.module.scss';
import { MusicApi } from '../../api/audioApi';
import { Player } from './Player';
import { BiPlay } from 'react-icons/bi';
import { Input } from 'antd';

export type track = {
    artist: {
        name: string;
        picture_medium: string;
    };
    duration: number;
    link: string;
    id: number;
    title: string;
    preview: string;
};

export default function Music() {
    const [tracks, setTracks] = useState([] as track[]);
    const [curId, setCurID] = useState<null | NodeJS.Timeout>(null);
    const [curTrack, setCurTrack] = useState<track | null>(null);
    const searchMusic = (e: any) => {
        // MusicApi.getMusic(e.currentTarget.val)

        const text = e.currentTarget.value;
        if (curId) {
            clearTimeout(curId);
        }
        if (text !== '') {
            let idTimeout = setTimeout(() => {
                MusicApi.getMusic(text).then((res) => {
                    setTracks(res.data);
                });
            }, 2000);
            setCurID(idTimeout);
        }
    };
    useEffect(() => {
        MusicApi.getMusic().then((res) => {
            setTracks(res.data);
            setCurTrack(res.data[0]);
        });
    }, []);
    const nextPlay = () => {
        if (curTrack !== null) {
            let nextTrack = tracks.findIndex(
                (track) => track.id === curTrack.id
            );
            if (nextTrack >= 0 && nextTrack < tracks.length - 1) {
                setCurTrack(tracks[nextTrack + 1]);
            } else {
                setCurTrack(tracks[0]);
            }
        }
    };
    const prevPlay = () => {
        if (curTrack !== null) {
            let nextTrack = tracks.findIndex(
                (track) => track.id === curTrack.id
            );
            console.log(nextTrack);
            if (nextTrack > 0) {
                setCurTrack(tracks[nextTrack - 1]);
            } else {
                setCurTrack(tracks[tracks.length - 1]);
            }
        }
    };
    return (
        <div>
            {tracks.length > 0 && (
                <Player
                    track={curTrack ? curTrack : tracks[0]}
                    nextPlay={nextPlay}
                    prevPlay={prevPlay}
                />
            )}
            <Input
                onChange={(e) => searchMusic(e)}
                placeholder='Поиск музыки'
                style={{ marginBottom: '1%' }}
            />
            {tracks.map((track) => {
                return (
                    <div
                        className={
                            curTrack && curTrack.id === track.id
                                ? `${styles.blockTrack} ${styles.activeTrack}`
                                : `${styles.blockTrack}`
                        }
                        key={track.id}
                        onClick={() => setCurTrack(track)}
                    >
                        {/* <BiPlay size={30} /> */}
                        {track.artist.name} - {track.title}
                    </div>
                );
            })}
        </div>
    );
}
