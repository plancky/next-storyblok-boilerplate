export class mailchimpInit {
    apiKey: string
    server_prefix: string
    endpoint: string

    constructor({
        apiKey,
        server_prefix,
    }: {
        apiKey: string
        server_prefix: string
    }) {
        this.apiKey = apiKey
        this.server_prefix = server_prefix
        this.endpoint = ''
    }

    async get() {
        const url = `https://${this.server_prefix}.api.mailchimp.com/3.0/${this.endpoint}`
        try {
            const response = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `api_key ${this.apiKey}`,
                },
            })

            const responseData = await response.json()
            return { data: responseData }
        } catch (error) {
            return {
                error: JSON.stringify(error),
            }
        }
    }

    async post(body: any) {
        const url = `https://${this.server_prefix}.api.mailchimp.com/3.0/${this.endpoint}`
        try {
            const response = await fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `api_key ${this.apiKey}`,
                },
            })

            const responseData = await response.json()
            return { data: responseData }
        } catch (error) {
            return {
                error: JSON.stringify(error),
            }
        }
    }

    ping() {
        this.endpoint = 'ping'
        return {
            get: this.get.bind(this),
        }
    }

    async subscribe(email: string) {
        const list_id = '344356948b'
        const member_obj = {
            email_address: email,
            email_type: 'html',
            status: 'subscribed',
        }
        this.endpoint = `lists/${list_id}?skip_merge_validation=true`
        return await this.post({
            members: [member_obj],
            update_existing: true,
        })
    }

    automations() {
        this.endpoint = 'automations'
        return {
            get: this.get.bind(this),
        }
    }
}
