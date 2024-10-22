import { PATH_GLOBAL_CHAT } from '../../../../shared/config/constants'
import { emailParser } from '../../../../shared/utils/emailHandler'
import { findTitleViewByPath } from '../../../../shared/utils/pathHandler'
import './messagesCard.css'

function NoMessagesYet() {
  const chatRoom = findTitleViewByPath()

  return (
    <div className='no__message'>
      {chatRoom === PATH_GLOBAL_CHAT ? (
        <p>Be the first one to drop a line into the Global Chat</p>
      ) : (
        <p>
          Type down something to start talking with{' '}
          <b>{emailParser(chatRoom)}</b>.
        </p>
      )}
    </div>
  )
}

export default NoMessagesYet
