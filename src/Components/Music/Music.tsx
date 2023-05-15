import { MusicInitialStateType } from '../../redux/musicReducer';
import styles from './Music.module.scss';

type PropsType = MusicInitialStateType;

export default function Music({ musics }: PropsType) {
    return (
        <div>
            <h2>Music</h2>
            {musics.map((track) => {
                return (
                    <div className={styles.blockTrack} key={track.id}>
                        <div>
                            {track.author} - {track.track}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
