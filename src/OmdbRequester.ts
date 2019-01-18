import { AxiosInstance } from "axios";
import { injectable } from "inversify";

interface OmdbMovie {
    Title: string;
    Year: string;
    Released: string;
    Plot: string;
}

@injectable()
export class OmdbRequester {
    public constructor(
        private readonly axios: AxiosInstance,
        private readonly apiKey: string,
    ) {
        //
    }

    public async findByTitle(title: string): Promise<OmdbMovie> {
        const params = {
            apiKey: this.apiKey,
            t: title,
        };

        const response = await this.axios.get<OmdbMovie>("https://www.omdbapi.com", {params});

        return response.data;
    }
}
