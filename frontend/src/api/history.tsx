const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

type resHistory = {
    status: number,
    history: any
}

export async function getHistoryFromApi() : Promise<resHistory> {
    const url = `http://${API_HOST}:${API_PORT}/doctors/history`

    const historyRes = await fetch(url)

    const status = historyRes.status
    
    if (status != 200) {
        return { status: status, history: null }
    }

    const history = await historyRes.json()

    return { status: 200, history: history }
}

