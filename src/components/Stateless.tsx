import { User } from '../model/User.face'

export default ({ name, age }: User) => {
  return (
    <div>
      name：{name} -- age：{age}
    </div>
  )
}
