export interface IAlmacenamientoImagenes {
  subir(archivo: Buffer, nombreArchivo: string, mimeType: string): Promise<string>;
  eliminar(url: string): Promise<void>;
}

export class AlmacenamientoImagenesAdapter implements IAlmacenamientoImagenes {
  constructor(private readonly bucketUrl: string) {}

  async subir(archivo: Buffer, nombreArchivo: string, mimeType: string): Promise<string> {
    // En producción: integrar AWS S3 SDK, Google Cloud Storage, o similar
    const key = `reportes/${Date.now()}-${nombreArchivo}`;
    // await s3Client.send(new PutObjectCommand({ Bucket: this.bucketUrl, Key: key, Body: archivo, ContentType: mimeType }));
    return `${this.bucketUrl}/${key}`;
  }

  async eliminar(url: string): Promise<void> {
    // En producción: eliminar de S3/GCS usando la URL
  }
}
