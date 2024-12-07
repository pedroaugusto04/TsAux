import { getJson } from "serpapi";
import { config } from "dotenv";
config();

export class ArtigoController {
  async buscarArtigos(req, res) {
    const { SCHOLAR_KEY, SCOPUS_KEY } = process.env;
    try {
      const artigosGoogleScholar = await this.buscarArtigosGoogleScholar(
        req.query.pesquisa,
        SCHOLAR_KEY
      );
      const artigosScopus = await this.buscarArtigosScopus(
        req.query.pesquisa,
        SCOPUS_KEY
      );

      const concat = artigosGoogleScholar.concat(artigosScopus);
      res.status(200).json(concat);
    } catch (error) {
      res.status(500).send("Erro ao buscar artigos");
    }
  }

  async buscarArtigosGoogleScholar(pesquisa, SCHOLAR_KEY) {
    const response = await getJson({
      engine: "google_scholar",
      q: pesquisa,
      api_key: SCHOLAR_KEY,
    });

    const linkEncontrado = response.search_metadata.google_scholar_url;

    const result = response.organic_results.map((result) => ({
      titulo: result.title,
      linkEncontrado: linkEncontrado,
      link: result.link,
    }));

    /*const result = [
      {
        titulo: "Coffee: recent developments",
        linkEncontrado: "https://scholar.google.com/scholar?&q=biology",
        link: "https://books.google.com/books?hl=en&lr=&id=jIFY_Pz8LH0C&oi=fnd&pg=PR3&dq=coffee&ots=ODGvRpjy1F&sig=Z1a-fTarQ6oIBRYiTSg_lz-PZdI",
        descricao:
          "… The physiological effects of coffee drinking are considered in a fascinating chapter on coffee and health. Agronomic aspects of coffee breeding and growing are covered specifically in …",
      },
      {
        titulo: "Coffee: recent developments",
        linkEncontrado: "https://scholar.google.com/scholar?&q=biology",
        link: "https://books.google.com/books?hl=en&lr=&id=jIFY_Pz8LH0C&oi=fnd&pg=PR3&dq=coffee&ots=ODGvRpjy1F&sig=Z1a-fTarQ6oIBRYiTSg_lz-PZdI",
        descricao:
          "… The physiological effects of coffee drinking are considered in a fascinating chapter on coffee and health. Agronomic aspects of coffee breeding and growing are covered specifically in …",
      },
      {
        titulo: "Coffee: recent developments",
        linkEncontrado: "https://scholar.google.com/scholar?&q=biology",
        link: "https://books.google.com/books?hl=en&lr=&id=jIFY_Pz8LH0C&oi=fnd&pg=PR3&dq=coffee&ots=ODGvRpjy1F&sig=Z1a-fTarQ6oIBRYiTSg_lz-PZdI",
        descricao:
          "… The physiological effects of coffee drinking are considered in a fascinating chapter on coffee and health. Agronomic aspects of coffee breeding and growing are covered specifically in …",
      },
    ];*/
    return result;
  }

  async buscarArtigosScopus(pesquisa, SCOPUS_KEY) {
    const apiUrl = `https://api.elsevier.com/content/search/scopus?httpaccept=application/json&query=${pesquisa}&apiKey=${SCOPUS_KEY}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const respostaFormatada = this.format(response);

      return respostaFormatada;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async format(scopusResponse) {
    const json = await scopusResponse.json();
    const entries = json["search-results"].entry;

    const result = entries.map((result) => ({
      titulo: result["dc:title"],
      linkEncontrado: "https://www.scopus.com/",
      link: result.link[2]["@href"],
    }));

    return result;
  }
}
