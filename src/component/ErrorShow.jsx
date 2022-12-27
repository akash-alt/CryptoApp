import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorShow = ({ message }) => {
  return (
    <div>
      <Alert
        status='error'
        position={"fixed"}
        bottom={"4"}
        left={"50%"}
        transform={"translateX(-50%)"}
        w={"container.lg"}
      >
        <AlertIcon>
          {message}
        </AlertIcon>
      </Alert>
    </div>
  )
}

export default ErrorShow