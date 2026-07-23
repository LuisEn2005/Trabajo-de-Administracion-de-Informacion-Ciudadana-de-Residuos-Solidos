export interface IAlmacenamientoImagenes {
  subir(archivo: Buffer, nombreArchivo: string, mimeType: string): Promise<string>;
  eliminar(url: string): Promise<void>;
}

export class AlmacenamientoImagenesAdapter implements IAlmacenamientoImagenes {
  constructor(private readonly bucketUrl: string) {}

  async subir(archivo: Buffer, nombreArchivo: string, mimeType: string): Promise<string> {
    void archivo;
    void mimeType;
    const key = `reportes/${Date.now()}-${nombreArchivo}`;
    return `${this.bucketUrl}/${key}`;
  }

  async eliminar(url: string): Promise<void> {
    void url;
  }
}
