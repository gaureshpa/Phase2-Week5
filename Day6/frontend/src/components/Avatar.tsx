type AvatarProps = {
    name: string
    imageUrl: string
}

function Avatar({ name, imageUrl }: AvatarProps) {
    return (
        <img
        src={imageUrl}
        alt={`${name}'s avatar`}
        width="40"
        height="40"
        />
    )
}

export default Avatar
