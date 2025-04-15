import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

const KeyHighlight = () => {
  return (
    <div>
      <Card className="w-full shadow-lg rounded-xl bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium">Card 1</h1>
              <div>
                <Label
                  htmlFor="key-highlight-title-1"
                  className="text-sm font-medium"
                >
                  Key Highlight Title
                </Label>
                <Input
                  id="key-highlight-title-1"
                  defaultValue="Achievements"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label
                  htmlFor="key-highlight-subtext-1"
                  className="text-sm font-medium"
                >
                  Sub-text
                </Label>
                <Input
                  id="key-highlight-subtext-1"
                  defaultValue="Achievements"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium">Card 2</h1>
              <div>
                <Label
                  htmlFor="key-highlight-title-2"
                  className="text-sm font-medium"
                >
                  Key Highlight Title
                </Label>
                <Input
                  id="key-highlight-title-2"
                  defaultValue="Skills"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label
                  htmlFor="key-highlight-subtext-2"
                  className="text-sm font-medium"
                >
                  Sub-text
                </Label>
                <Input
                  id="key-highlight-subtext-2"
                  defaultValue="Proficient in React, JavaScript, and Django."
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium">Card 3</h1>
              <div>
                <Label
                  htmlFor="key-highlight-title-3"
                  className="text-sm font-medium"
                >
                  Key Highlight Title
                </Label>
                <Input
                  id="key-highlight-title-3"
                  defaultValue="Experience"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label
                  htmlFor="key-highlight-subtext-3"
                  className="text-sm font-medium"
                >
                  Sub-text
                </Label>
                <Input
                  id="key-highlight-subtext-3"
                  defaultValue="Worked on full-stack development projects."
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Card 4 */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium">Card 4</h1>
              <div>
                <Label
                  htmlFor="key-highlight-title-4"
                  className="text-sm font-medium"
                >
                  Key Highlight Title
                </Label>
                <Input
                  id="key-highlight-title-4"
                  defaultValue="Leadership"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label
                  htmlFor="key-highlight-subtext-4"
                  className="text-sm font-medium"
                >
                  Sub-text
                </Label>
                <Input
                  id="key-highlight-subtext-4"
                  defaultValue="Led multiple successful projects."
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyHighlight;
