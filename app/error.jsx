'use client'

import {Button, Result} from "antd";

export default function Error({ error, reset }) {
  console.log("eee")
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => reset()}>Try again</Button>}
    />
  )
}