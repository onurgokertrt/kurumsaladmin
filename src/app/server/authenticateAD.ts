import LdapClient from 'ldapjs-client';
import fs from 'fs';
import { handleError } from '../utils/handleError';

const authenticateAD = async (username: string, password: string) => {
  let returnedUser: any;

  // LDAP client oluştur
  const client = new LdapClient({
    url: process.env.LDAP_URL!,
    tlsOptions: {
      rejectUnauthorized: true,
      requestCert: true,
      ca: [fs.readFileSync(`${process.cwd()}/app/server/DcRootCA.cer`)],
      checkServerIdentity: (url: string, cert: any) => { }
    }
  });

  try {
    // Bind işlemi
    await client.bind(`${username}@trt.net.tr`, password);

    // Kullanıcıyı arama
    const searchBase = 'dc=int,dc=trt,dc=net,dc=tr';

    // Arama ayarları
    const searchOptions = {
      scope: 'sub',
      filter: `(userPrincipalName=${username}@trt.net.tr)`,
      attributes: ['*']
    };

    // Arama işlemi
    const result = await client.search(searchBase, searchOptions);

    // Kullanıcı bilgileri
    const user: any = result[0];

    // Kullanıcı varsa bilgilerini döndür
    if (user) {
      const name = user.cn;
      const firstName = user.givenName || '';
      const lastName = user.sn || '';
      const phone = user.extensionAttribute1 || '';
      const title = user.title || '';
      const employeeid = user.employeeID || '';
      const department = user.department || '';
      const email = user.mail || '';
      returnedUser = {
        name,
        firstName,
        lastName,
        phone,
        employeeid,
        title,
        department,
        email
      };
      return returnedUser;
    } else {
      // Kullanıcı yoksa hata döndür
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.log("Error:" + (error as any).body)
    handleError("authenticate","post",error)
    return false;
  }
}

const authenticateADNew = async (username: string, password: string) => {
  let returnedUser: any;

  // LDAP client oluştur
  const client = new LdapClient({
    url: "ldaps://172.30.203.197",
    tlsOptions: {
      rejectUnauthorized: true,
      requestCert: true,
      ca: [fs.readFileSync(`${process.cwd()}/app/server/DcRootCANew.cer`)],
      checkServerIdentity: (url: string, cert: any) => { }
    }
  });

  try {
    // Bind işlemi
    await client.bind(`testadmin@trttest.local`, 'Ankara2024!');

    // Kullanıcıyı arama
    const searchBase = 'DC=trttest,DC=local';

    // Arama ayarları
    const searchOptions = {
      scope: 'sub',
      filter: `(userPrincipalName=testadmin)`,
      attributes: ['*']
    };

    // Arama işlemi
    const result = await client.search(searchBase, searchOptions);

    console.log("\n !! SUCCESS !! \n")

    // Kullanıcı bilgileri
    const user: any = result[0];

    console.log("\n !! USER !! \n", user)

    // Kullanıcı varsa bilgilerini döndür
    if (user) {
      return returnedUser;
    } else {
      // Kullanıcı yoksa hata döndür
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.log("Error:" + (error as any).body)
    handleError("authenticateNew","post",error)
    return false;
  }
}

export { authenticateAD, authenticateADNew };