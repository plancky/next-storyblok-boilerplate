export type ModContactFormType = {
    firstname: string
    lastname: string
    email: string
    pitchdeck: string
    pitchdeckUrl?: string
    linkedinUrl?: string | undefined
    message?: string | undefined
    fileType?: string | undefined
    sector?: string | undefined
    roundsize?: string | undefined
}
export const EmailTemplate = (data: ModContactFormType) => {
    return (
        <div>
            <div>
                <strong>First Name: </strong>
                {data.firstname}
            </div>
            <div>
                <strong>Last Name: </strong>
                {data.lastname}
            </div>
            <div>
                <strong>Email: </strong>
                {data.email}
            </div>
            {data.linkedinUrl && (
                <div>
                    <strong>Linkedin: </strong>
                    {data.linkedinUrl}
                </div>
            )}
            {data.sector && (
                <div>
                    <strong>Sector: </strong>
                    {data.sector}
                </div>
            )}
            {data.roundsize && (
                <div>
                    <strong>Round Size: </strong>
                    {data.roundsize}
                </div>
            )}
            {data.pitchdeckUrl && (
                <div>
                    <strong>Pitchdeck URL: </strong>
                    {data.pitchdeckUrl}
                </div>
            )}
            {data.message && (
                <div>
                    <strong>Message: </strong>
                    {data.message}
                </div>
            )}
        </div>
    )
}
