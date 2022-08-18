/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import axios from 'axios';
// import FileViewer from "react-native-file-viewer";

const App = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // RenderPDF()
  }, [])

  // const RenderPDF = async () => {
  //   const path = await FileViewer.open('https://gdlp01.c-wss.com/gds/0/0300004730/02/eosrt3-eos1100d-im2-c-en.pdf') // absolute-path-to-my-local-file.
  //   console.log(path, '<<< path');
  // }

  const url =
    "https://gdlp01.c-wss.com/gds/0/0300004730/02/eosrt3-eos1100d-im2-c-en.pdf";

  const link = 'https://maps.apple.com/?address=Pegangsaan%20Dua,%20Jakarta%20Utara,%20Jakarta,%20Indonesia&auid=478112535972791237&ll=-6.176045,106.912648&lsp=7618&q=Pegangsaan%20Dua&_ext=Ch4KBAgEEEUKBAgFEAMKBAgGEAQKBAgKEAEKBAhVEA0SJilHBU62gbsYwDF6NxYUBrpaQDmx4emVsowYwEEHQrKACbtaQFAM'

  // *IMPORTANT*: The correct file extension is always required.
  // You might encounter issues if the file's extension isn't included
  // or if it doesn't match the mime type of the file.
  // https://stackoverflow.com/a/47767860
  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  const download = () => {
    axios({
      url: 'https://www.placecage.com/3499/3499',
      onDownloadProgress(progress) {
        console.log('download progress:', progress);
      }
    }).then(response => {
      console.log('response has arrived');
    });
  };

  const extension = getUrlExtension(url);

  // Feel free to change main path according to your requirements.
  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
    begin: (res) => {
      // console.log('begin', res);
    },
    progress: (res) => {
      let persentage = res.bytesWritten / res.contentLength
      console.log(`${(persentage * 100).toFixed()}%`);
      setProgress(`${(persentage * 100).toFixed()}%`)
    },
  };

  const RenderPDF = () => {
    setLoading(true)
    RNFS.downloadFile(options)
      .promise.then((e) => {
        // console.log(e, '<<<<<< promise result')
        if (e.statusCode === 200) {
          setLoading(false)
          FileViewer.open(localFile)
        } else {
          setLoading(true)
        }
      })
      .then(() => {
        setLoading(false)
        // success
      })
      .catch((error) => {
        // error
      });
  }

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'red',
            margin: 10
          }}
          onPress={() => Linking.openURL(link)}
        >
          <View>
            <Text>Testing Deeplink Apple Maps</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => RenderPDF()}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'lightsalmon',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            <Text>
              Testing Download PDF
            </Text>
          </View>
          <View
            style={{
              margin: 10
            }}
          >
            <Text>
              {progress !== '100%' ? `Progress Download ${progress}` : 'Done'}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          {loading ? <View><Text>Loading</Text><ActivityIndicator size={'small'} /></View> : <View></View>}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default App;
