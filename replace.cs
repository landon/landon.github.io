#!/usr/bin/env ./rcs
// uncomment the above line and chmod +x this file to make executable
// ./replace.cs INCLUDE_essentials.html_,INCLUDE_coding.html_,INCLUDE_math.html_,INCLUDE_data.html_,INCLUDE_about.html_ in pre_index.html with essentials.html,coding.html,math.html,data.html,about.html as index.html

using System;
using System.IO;
using System.Linq;
namespace Tools
{
    class Replace
    {
        static void Main(string[] args)
        {
            if (args.Length < 8)
            {
                Console.WriteLine("replaces token t_k with file w_k in f, written to o");
                Console.WriteLine("./replace.cs t_1,...,t_n in f with w_1,...,w_n as o");
                return;
            }

            var tokens = args[1].Split(',');
            var file = args[3];
            var replacementFiles = args[5].Split(',');
            var output = args[7];

            string text;
            using (var sr = new StreamReader(file))
                text = sr.ReadToEnd();

            foreach (var pair in tokens.Zip(replacementFiles, (t, f) => (Token: t, File: f)))
            {
                string replacement;
                using (var sr = new StreamReader(pair.File))
                    replacement = sr.ReadToEnd();

                text = text.Replace(pair.Token, replacement);
            }

            using (var sw = new StreamWriter(output))
                sw.Write(text);
        }
    }
}

