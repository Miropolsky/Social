import styles from './Music.module.scss';

export default function Music({ musics }) {
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
