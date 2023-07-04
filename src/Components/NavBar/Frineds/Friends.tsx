import { FriendType } from '../../../types/types';
import styles from './Friends.module.scss';

export default function Friends({ friends } : { friends: Array<FriendType>}) {
    return (
        <div className={styles.container}>
            <h3>Friends</h3>
            <div className={styles.friends}>
                {friends.map((friend) => {
                    return (
                        <div key={friend.id} className={styles.friend}>
                            <div>
                                <img
                                    className={styles.friendImg}
                                    src={friend.imgUrl}
                                    alt='avatar'
                                />
                            </div>
                            <div className={styles.friendName}>
                                {friend.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
